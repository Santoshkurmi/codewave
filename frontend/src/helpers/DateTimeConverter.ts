

  /**
   * Format a date string into a human-readable format.
   * @param timestamp a string representing a timestamp
   * @returns a string representing the date in a human-readable format
   * - if the date is today, the time only is returned in the format "HH:mm"
   * - if the date is this year, the date is returned in the format "MMM d"
   * - otherwise, the date is returned in the format "MMM d, yyyy"
   */
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