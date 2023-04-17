export const detectDevice = () => {
    const userAgent = navigator.userAgent;
  
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
  
    if (isMobile) {
      // console.log("Device: Mobile");
      return true;
    } else {
      // console.log("Device: Laptop/PC");
      return false;
    }
  };
  