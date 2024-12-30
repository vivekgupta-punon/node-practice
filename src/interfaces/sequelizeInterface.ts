import { Model, ModelStatic } from "sequelize";

export interface AssociableModel extends ModelStatic<Model> {
    associate?: (models: Record<string, ModelStatic<Model>>) => void;
}