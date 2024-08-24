

const formatDate = (timestamp:string) => {
    const date = new Date(timestamp);
    const now = new Date();
  
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  
    const isSameYear = date.getFullYear() === now.getFullYear();
  
    if (isToday) {
      return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }); // Time only
    } else if (isSameYear) {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" }); // Month and day only
    } else {
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }); 
    }
  };

  export {formatDate};