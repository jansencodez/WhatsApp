function formatTime(isoString) {
  const date = new Date(isoString); // Create a Date object from the ISO string

  if (isNaN(date.getTime())) return "Invalid Date"; // Check for invalid date

  const hour = date.getHours(); // get local hours
  const minutes = date.getMinutes(); // get local minutes
  const suffix = hour >= 12 ? "pm" : "am"; // Determine AM or PM
  const adjustedHour = hour % 12 || 12; // Adjust hour for 12-hour format

  return `${adjustedHour}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}

export default formatTime;
