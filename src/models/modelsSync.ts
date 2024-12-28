import User from "./UserModel";
import Authentication from "./AuthModel";
import Task from "./TaskModel";


export default async function modelsSync()
{
    await User.sync();
    await Authentication.sync();
    await Task.sync();
}