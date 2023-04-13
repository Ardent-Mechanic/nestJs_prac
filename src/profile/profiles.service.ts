import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Profile } from "./profile.model";

@Injectable()
export class ProfilesService {

  constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {
  }

  // Создание профиля
  async createProfile(dto: CreateProfileDto) {

    const profile = await this.profileRepository.create(dto);
    return profile;
  }

  async getProfile(id: number) {

    const userId = id;
    const profile = await this.profileRepository.findOne({ where: { userId }, include: ['users'] });
    return profile;
  }

  async updateProfile(req: any, dto: CreateProfileDto) {

    console.log(typeof dto.userId, " " ,typeof req.user.id);
    console.log(dto.userId, " " , req.user.id);

    try {

      const user = req.user;
      let curUserId: number;

      if (dto.userId === undefined || dto.userId === user.id) {
        console.log('accept1');
        curUserId = user.id;
        dto.userId = curUserId;
      } else if (dto.userId && this._getSelectedRole("ADMIN", user.roles).value) {
        console.log('accept2');
        curUserId = dto.userId;
      } else {
        console.log('accept3');
        throw new HttpException('Доступ к изменению чужого профиля запрещен', HttpStatus.BAD_REQUEST);
      }

      await this.profileRepository.update(dto, { where: { userId: curUserId } });
      return {status: 'OK'};
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProfile(req: any, dto: CreateProfileDto) {
    try {

      const user = req.user;
      let curUserId: number;

      if (dto.userId === undefined || dto.userId === user.id) {
        curUserId = user.id;
        dto.userId = curUserId;
      } else if (dto.userId && this._getSelectedRole("ADMIN", user.roles).value) {
        curUserId = dto.userId;
      } else {
        throw new HttpException('Доступ к изменению чужого профиля запрещен', HttpStatus.BAD_REQUEST);
      }

      await this.profileRepository.destroy({ where: { userId: curUserId } });
      return {status: 'OK'};
    } catch (e) {
      console.log(e);
    }
  }

  private _getSelectedRole(roleName: string, rolesArray: Array<any>) {
    let answ = rolesArray.find(role => role.value === roleName);
    answ = (answ === undefined) ? {value: undefined} : answ;
    return answ;
  }

}