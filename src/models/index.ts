import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Profile extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public profession!: string;
  public balance!: number;
  public type!: 'client' | 'contractor';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2)
    },
    type: {
      type: DataTypes.ENUM('client', 'contractor')
    }
  },
  {
    sequelize,
    modelName: 'Profile'
  }
);

class Contract extends Model {
  public id!: number;
  public terms!: string;
  public status!: 'new' | 'in_progress' | 'terminated';
  public ClientId!: number;
  public ContractorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contract.init(
  {
    terms: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('new', 'in_progress', 'terminated')
    }
  },
  {
    sequelize,
    modelName: 'Contract'
  }
);

class Job extends Model {
  public id!: number;
  public description!: string;
  public price!: number;
  public paid!: boolean;
  public paymentDate!: Date;
  public ContractId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Job.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paymentDate: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'Job'
  }
);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

export { sequelize, Profile, Contract, Job };
