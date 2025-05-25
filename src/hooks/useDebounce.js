import { useEffect, useState } from "react";

/**
 * 입력값이 바뀐 뒤 일정 시간 동안 아무 입력이 없을 때만 최종 값을 반영함
 * @param {string} value - 사용자의 입력 값
 * @param {number} delay - 지연 시간 (기본 1000ms)
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;