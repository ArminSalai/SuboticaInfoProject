export default function shortenDesc(desc, length) {
  const short = String(desc).substring(0, length) + "...";

  return short;
}