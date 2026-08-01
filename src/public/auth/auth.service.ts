import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { ClientSession, Connection, Model } from 'mongoose';
import { Employee } from 'src/employee/employee/schemas/employee.schema';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    // to use sesion we need to inject the connection and the models
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  private async generateEmployeeId(session: ClientSession): Promise<string> {
    // go to employee modal then check the last employeeId and increment it by 1 so if employye is deleted then the employeeId will not be reused and it will be unique
    const lastEmployee = await this.employeeModel
      .findOne()
      .sort({ createdAt: -1 })
      .select('employeeId')
      .session(session)
      .lean()
      .exec();
    if (!lastEmployee) {
      return 'EID-000001';
    }
    const lastNumber = Number(lastEmployee.employeeId.replace('EID-', ''));
    const newNumber = lastNumber + 1;
    return `EID-${newNumber.toString().padStart(6, '0')}`;
  }

  async createUser(payload: Partial<User>) {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();
      const { email } = payload;
      // check user
      const isUserExists = await this.userModel
        .findOne({
          email,
          isDeleted: false,
        })
        .session(session);
      if (isUserExists) {
        throw new ConflictException('User already exists');
      }
      //   to use session we have to pass as array of object not just object
      const newUser = await this.userModel.create(
        [
          {
            uuid: uuidv4(),
            email,
            password: payload.password,
            role: payload.role,
            name: payload.name,
          },
        ],
        { session },
      );

      if (!newUser?.length) {
        throw new BadRequestException('Failed to create an user');
      }

      const isEmployeeExists = await this.employeeModel
        .findOne({
          email,
          isDeleted: false,
        })
        .session(session);
      if (isEmployeeExists) {
        throw new ConflictException('Employee already exists');
      }
      const employeeId = await this.generateEmployeeId(session);
      const user = newUser[0]?._id;
      const newEmployee = await this.employeeModel.create(
        [
          {
            uuid: uuidv4(),
            name: payload.name,
            employeeId,
            user,
            email,
            phone: payload.phone,
          },
        ],
        { session },
      );

      if (!newEmployee.length) {
        throw new BadRequestException('Failed to create an employee');
      }
      await session.commitTransaction();
      await session.endSession();

      const { password, ...userWithoutPassword } = newUser[0].toObject();

      return userWithoutPassword;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }
}
