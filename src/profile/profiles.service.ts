import { Injectable } from "@nestjs/common";
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
    const profile = await this.profileRepository.findOne({ where: { userId }, include: { all: true } });
    return profile;
  }

  async updateProfile(req: any, dto: CreateProfileDto) {
    try {

      const user = req.user;
      let curUserId: number;

      if (dto.userId === undefined || dto.userId === user.id) {
        curUserId = user.id;
        dto.userId = curUserId;
      } else if (dto.userId && this._getSelectedRole("ADMIN", user.roles).value) {
        curUserId = dto.userId;
      } else {
        throw new Error("Доступ к изменению чужого профиля запрещен");
      }
      const profile = await this.profileRepository.update(dto, { where: { userId: curUserId } });
      return profile;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProfile(req: any, dto: CreateProfileDto) {

    try {
      const user = req.user;
      let userId: number;

      if (this._getSelectedRole("ADMIN", user.roles)) {
        userId = dto.userId;
      } else {
        userId = user.id;
        dto.userId = userId;
      }
      const profile = await this.profileRepository.destroy({ where: { userId } });
      return profile;
    } catch (e) {
      console.log(e);
    }
  }

  private _getSelectedRole(roleName: string, rolesArray: Array<any>) {

    const answ = rolesArray.find(role => role.value === roleName);
    console.log(answ);
    return answ;
  }

  // async getRoleByValue(value: string) {
  //   const role = await this.profileRepository.findOne({where: {value}})
  //   return role;
  // }

}