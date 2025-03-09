
export const saveToken = (data) => {
    localStorage.setItem("token", data?.token);
    localStorage.setItem("loginType", data?.loginType);
    if (data?.Admin) {
      localStorage.setItem(
        "Admin",
        data?.Admin
      );
    }
  };
  export const  saveSearchQuery = (data) => {
    localStorage.setItem("searchQuery", data);
  }
  export const getSearchQuery = () => {
    return localStorage.getItem("searchQuery");
  }
  export const getAdmin = () => {
    return localStorage.getItem("Admin");
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
  