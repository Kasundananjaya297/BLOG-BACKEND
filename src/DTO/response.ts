export const responseDTO = (success: string, data: any, message: String) => {
  return { success: success, data: data, message: message };
};
export const userDTO = (data: any, Authorization?: string) => {
  return {
    email: data.email,
    name: data.name,
    role: data.role,
    Authorization: Authorization,
  };
};
