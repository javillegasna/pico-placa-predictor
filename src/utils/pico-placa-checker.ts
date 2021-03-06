import config from "../config/config";
//obtain day number of IsoDate
export const getDayNumber = (date: string): number =>{
  const dayNumber = new Date(date).getUTCDay();
  if(dayNumber===0) return 7
  return dayNumber
}

//it's necessary a time with the format "HH:mm"
export const createDate = (time: string): Date => {
  const now = new Date();
  const date = new Date(now);
  date.setHours(parseInt(time.split(":")[0]), parseInt(time.split(":")[1]));
  return date;
};

//With a range of time returns true if a time is between
export const IsTimeInRange = (
  startTime: string,
  endTime: string,
  currentTime: string
): boolean => {
  const startDate = createDate(startTime);
  const endDate = createDate(endTime);
  const currentDate = createDate(currentTime);
  return startDate <= currentDate && endDate >= currentDate;
};

//obtain just the last number of the plate compatible formats TBD-5695, TBD5695 OR 5695 but is necessary validate the inputs;
export const getLastPlateNumber = (plateNumber: string): number =>
  parseInt(plateNumber.charAt(plateNumber.length-1));

//whit a day Number  returns an array whit permitted plate Number
export const getNotPermitPlatesNumbers = (dayNumber: number): number[] => {
  const numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  if (dayNumber > 5) return [];
  return numbersList.filter(
    (number, index) => index >= dayNumber * 2 - 2 && index < dayNumber * 2
  );
};

// main function
export const picoPlacaChecker = ( 
  plateNumber: string,
  date: string,
  time: string
): boolean => {
  //First obtain the day number of the date provided
  const dayNumber = getDayNumber(date);
  //Second on saturday or sunday all plates numbers are permitted
  if (dayNumber === 6 || dayNumber === 7) return false;
  // Third if the time is't on range  (Hours: 7:00am - 9:30am / 16:00pm - 19:30) all plates are permit.
  if (
    !IsTimeInRange(config.startMorning, config.endMorning, time) &&
    !IsTimeInRange(config.startAfternoon, config.endAfternoon, time)
  )
    return false;
  //Fourth if aren't a weekend we need to check what platte Numbers isn't permitted.
  const arrayOfPlates = getNotPermitPlatesNumbers(dayNumber);
  //Fifth its necessary to obtain the last number of the plate
  const LastPlateNumber = getLastPlateNumber(plateNumber);
  //Sixth finally compare if the plate number was on restricted numbers.
  return arrayOfPlates.includes(LastPlateNumber);
};
export default picoPlacaChecker;
