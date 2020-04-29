export function convertToYYYYMMDD(str: string) {

  if (str == null) throw Error();


  var mnths = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  },
    date = str.split(" ");

  return [date[3], mnths[date[1]], date[2]].join("-");
}
export function sleepForASetAmountOfTimeInMiliSeconds(ms: number) {
  if (ms == null) throw Error();
  return new Promise(resolve => setTimeout(resolve, ms));
}
