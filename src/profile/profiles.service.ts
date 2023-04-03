import { Injectable } from '@nestjs/common';
import {CreateProfileDto} from "./dto/create-profile.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";

@Injectable()
export class ProfilesService {

  constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {}

  // Создание профиля
  async createProfile(dto: CreateProfileDto) {
    const profile = await this.profileRepository.create(dto);
    return profile;
  }

  // Вывод профиля и почты с паролем
  async getProfile(id: number) {
    const profile = await this.profileRepository.findOne({where: {id}, include: {all: true}});
    return profile;
  }

  async updateProfile(id: number, dto: CreateProfileDto) {
    const profile = await this.profileRepository.update(dto, {where: {id}});
    console.log(profile);
    return profile;
  }

  async deleteProfile(id: number) {
    const profile = await this.profileRepository.destroy({where: {id}});
    return profile;
  }

  // async getRoleByValue(value: string) {
  //   const role = await this.profileRepository.findOne({where: {value}})
  //   return role;
  // }

}