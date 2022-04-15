const getDayNumber=(date:string):number => new Date(date).getDay();

const getLastPlateNumber=(plateNumber:string):number=>parseInt(plateNumber.substring(-1));

const createDate = (time:string):Date=>{
  const now = new Date();
  const date =  new Date(now);
  date.setHours(parseInt(time.split(":")[0]),parseInt(time.split(":")[1]));
  return date;
}
const IsTimeInRange = (startTime:string,endTime:string,currentTime:string)=>{
  const startDate = createDate(startTime);
  const endDate =  createDate(endTime);
  const currentDate = createDate(currentTime);
  return startDate<currentDate&&endDate>currentDate
}
const getPermitPlates=(dayNumber:number):number[]=>{
  const numbersList = [1,2,3,4,5,6,7,8,9,0];
  if(dayNumber>5) return numbersList;
  return numbersList.filter((number,index)=>index<dayNumber*2-2||index>dayNumber*2)
  //return numbersList.slice(dayNumber*2-2,dayNumber*2);
}

const picoPlacaChecker = (plateNumber:string,date:string,time:string):boolean=>{
  const dayNumber = getDayNumber(date);
  //on saturday or sunday all plates are permit
  if(dayNumber===6 || dayNumber ===7) return true;
  //if the time is't on range  (Hours: 7:00am - 9:30am / 16:00pm - 19:30) all plates are permit.
  if(!IsTimeInRange("7:00","9:30",time)||!IsTimeInRange("16:00","19:30",time)) return true
  //if aren't a weekend or day  we need to check
  const arrayOfPlates = getPermitPlates(dayNumber)
  const LastPlateNumber = getLastPlateNumber(plateNumber);
  return arrayOfPlates.includes(LastPlateNumber);
}
export default picoPlacaChecker;
