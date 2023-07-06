import bcrypt from "bcrypt";

export const generateHashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(plainPassword, salt);
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = (plainPassword: string, hashPassword: string): Promise<boolean> => {
  try {
    return bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    throw error;
  }
};
