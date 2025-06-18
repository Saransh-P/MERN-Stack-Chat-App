export function formatMessageTime(date) {
  const messageDate = new Date(date);
  
  // Get time in HH:mm format
  const time = messageDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Get date in DD MMM YYYY format
  const dateStr = messageDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Combine them in the format "HH:mm - DD MMM YYYY"
  return `${time} - ${dateStr}`;
}