import React, { useState } from 'react';

const TimeAlert = () => {
  const [time, setTime] = useState('');

  const onChangeTime = (e: any) => setTime(e.target.value);

  const now = new Date();
  const selectTime = new Date(time);

  // console.log(now);
  // console.log(selectTime);

  const diffTime =
    (selectTime.getTime() - now.getTime()) / (60 * 60 * 1000);

  // console.log(diffTime);

  return (
    <div>
      <label>
        配達日時：
        {!time && <span>配達日時を入力して下さい</span>}
        {diffTime <= 3 && (
          <span>今から3時間後の日時をご入力ください</span>
        )}
        <br></br>
        <input
          type="datetime-local"
          value={time}
          onChange={onChangeTime}
        />
      </label>
    </div>
  );
};

export default TimeAlert;
