import { useState, useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // 追蹤選中的日期
  const [showYearDropdown, setShowYearDropdown] = useState(false); // 控制年份選單顯示
  const dropdownRef = useRef(null); // 追蹤年份清單的 DOM 元素

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startPaddingDays = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null); // 切換月份時清空選中日期
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null); // 切換月份時清空選中日期
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(year, month, day)); // 設定選中的日期
  };

  const handleYearSelect = (selectedYear) => {
    setCurrentDate(new Date(selectedYear, month, 1));
    setShowYearDropdown(false); // 選擇年份後隱藏清單
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowYearDropdown(false); // 點擊清單外部時隱藏清單
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col w-[90%] h-[90%] bg-white rounded-md border-1 shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b-2 border-black">
        <button
          className="w-10 h-8 text-center text-gray-200 bg-slate-800 rounded-lg text-sm font-bold"
          onClick={() => setCurrentDate(new Date())}
        >
          今天
        </button>

        {/* Year and Month Display */}
        <div className="relative text-lg font-bold cursor-pointer">
          {/* 年分顯示區域 */}
          <span onClick={() => setShowYearDropdown((prev) => !prev)}>
            {`${year} 年 ${month + 1} 月`}
          </span>

          {/* 年分下拉清單 */}
          {showYearDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-8 left-0 w-32 bg-white border rounded shadow-lg max-h-64 overflow-y-auto z-10"
            >
              {Array.from({ length: 21 }, (_, index) => {
                const displayYear = year - 10 + index; // 顯示目前年份的前後 10 年
                return (
                  <div
                    key={displayYear}
                    className={`p-2 text-center cursor-pointer ${
                      displayYear === year ? "bg-blue-100 font-bold" : ""
                    } hover:bg-blue-200`}
                    onClick={() => handleYearSelect(displayYear)}
                  >
                    {displayYear}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 月份切換按鈕 */}
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center justify-center text-gray-200 bg-slate-800 rounded-lg w-8 h-8 border-2 border-gray-500"
            onClick={handlePrevMonth}
          >
            <BsChevronLeft />
          </button>
          <button
            className="flex items-center justify-center text-gray-200 bg-slate-800 rounded-lg w-8 h-8 border-2 border-gray-500"
            onClick={handleNextMonth}
          >
            <BsChevronRight />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 p-4">
        {/* Weekdays Header */}
        {["日", "一", "二", "三", "四", "五", "六"].map((day, index) => (
          <div
            key={index}
            className="text-center font-bold text-gray-700 uppercase"
          >
            {day}
          </div>
        ))}

        {/* Padding Days */}
        {Array.from({ length: startPaddingDays }).map((_, index) => (
          <div key={index} className="text-center text-gray-400"></div>
        ))}

        {/* Days of the Month */}
        {Array.from({ length: totalDays }).map((_, dayIndex) => {
          const day = dayIndex + 1;
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          return (
            <div
              key={day}
              className={`text-center p-2 rounded-lg cursor-pointer ${
                isSelected
                  ? "border-2 border-blue-500 bg-blue-100 font-bold"
                  : day === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear()
                  ? "bg-blue-500 text-white font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
