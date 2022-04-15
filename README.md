# Pico & placa Predictor

Pico y placa predictor is an open source project, designed based on the regulations imposed by the Ecuadorian ANT.

These vehicle regulations consist of limiting vehicular circulation within the metropolitan area of Quito, Monday through Friday during the following hours:

- In the morning: 7:00am to 9:30am.

- In the afternoon: 16:00pm to 19:30pm.

Restrictions will be based on the following table:

| Monday | Tuesday | Wednesday | Thursday | Friday |
|--------|---------|-----------|----------|--------|
| 1,2    | 3,4     | 5,6       | 7,8      | 9,0    |
## Define main method
The minimum inputs required are:
- A date:
  - **Type:** String
  - **Format:**: YYYY-MM-DD
- A time
  - **Type:** String
  - **Format:** hh:mm
- A plate Number
  - **Type:** String
  - **Format:**  TBD-5695 or TBD5695 or 5695

Just one output is expected and there is a boolean, that represents:
- **True**: The plate Number provided is restricted.
- **False**: The plate Number provided isn't restricted.
## Steps to solving
```typescript
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
```
# Available Scripts

In the project directory, you can run:

### `npm start`

For execute the project, This will raise a server on port 3000

### `npm test`

Launches jest test runner in the interactive watch mode. They will be executed automatically when a push is performed from the local repository.
