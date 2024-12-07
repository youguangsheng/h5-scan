export const formatTimestamp = timestamp => {
  var date = new Date(timestamp * 1000);
  var parts = [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + date.getDate()).slice(-2),
    ("0" + date.getHours()).slice(-2),
    ("0" + date.getMinutes()).slice(-2),
    ("0" + date.getSeconds()).slice(-2)
  ];

  return parts.slice(0, 3).join("-") + " " + parts.slice(3).join(":");
};
