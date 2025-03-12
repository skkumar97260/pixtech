
export const saveToken = (data) => {
    localStorage.setItem("token", data?.token);
    localStorage.setItem("loginType", data?.loginType);
    if (data?.Admin) {
      localStorage.setItem(
        "AdminId",
        data?.Admin
      );
    }
  };
  
  export const getAdminId = () => {
    return localStorage.getItem("AdminId");
  }
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const getLoginType = () => {
    return localStorage.getItem("loginType");
  };
  
  export const clearStorage = () => {
    localStorage.clear();
  };
  