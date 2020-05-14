export const dateDifferance = (currentTimeMS, beforeTimeMS) => {
  var time_in_ms = currentTimeMS - beforeTimeMS;

  var time_in_sec = time_in_ms / 1000;

  var sec = Math.floor(time_in_sec % 60);

  var time_in_min = time_in_sec / 60;

  var min = Math.floor(time_in_min % 60);

  var time_in_hour = time_in_min / 60;

  var hours = Math.floor(time_in_hour % 24);

  var days = Math.floor(time_in_hour / 24);

  return { sec, min, hours, days };
};

export const getTimeOfId = (id) => {
  const timestamp = id.substring(0, 8);
  return parseInt(timestamp, 16) * 1000;
};

export const getTimeToShow = (id) => {
  var timeObject = dateDifferance(new Date().getTime(), getTimeOfId(id));
  if (timeObject.days) {
    switch (timeObject.days) {
      case 1:
        return 'يوم';
      case 2:
        return 'يومان';
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return `${timeObject.days} أيام`;
      default:
        return new Date(getTimeOfId(id)).toDateString();
    }
  } else if (timeObject.hours) {
    switch (timeObject.hours) {
      case 1:
        return 'ساعة';
      case 2:
        return 'ساعتان';
      default:
        return `${timeObject.hours} ساعة`;
    }
  } else if (timeObject.min) {
    switch (timeObject.min) {
      case 1:
        return 'دقيقة';
      case 2:
        return 'دقيقتان';
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return `${timeObject.min} دقائق`;
      default:
        return `${timeObject.min} دقيقة`;
    }
  } else if (timeObject.sec) {
    switch (timeObject.sec) {
      case 1:
        return 'ثانية';
      case 2:
        return 'ثانيتان';
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return `${timeObject.sec} ثواني`;
      default:
        return `${timeObject.sec} ثانية`;
    }
  }
};
