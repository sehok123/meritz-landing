

// 날짜 관련 상수
const SPECIAL_DATE_RANGE = {
    start: new Date('2024-10-30'),  // 시작일
    end: new Date('2024-10-31')     // 종료일
};

// 시간 관련 상수 (기본값 설정)
let SPECIAL_START_HOUR = 4;
let SPECIAL_END_HOUR = 6;

try {
    const urlParams = new URLSearchParams(window.location.search);
    const sHour = urlParams.get('sHour')
    if (sHour) {
        // URL 파라미터 값을 숫자로 변환, 실패시 기본값 사용
        SPECIAL_START_HOUR = parseInt(urlParams.get('sHour')) || 4;
        SPECIAL_END_HOUR = parseInt(urlParams.get('eHour')) || 6;

        // 유효성 검사 추가
        if (isNaN(SPECIAL_START_HOUR) || isNaN(SPECIAL_END_HOUR)) {
            throw new Error('유효하지 않은 시간 값입니다.');
        }

        console.log(`SPECIAL_START_HOUR = ${SPECIAL_START_HOUR} & SPECIAL_END_HOUR = ${SPECIAL_END_HOUR}`);
    }
} catch (error) {
    console.error('시간 설정 중 오류 발생:', error);
    // 에러 발생시 기본값으로 복원
    SPECIAL_START_HOUR = 4;
    SPECIAL_END_HOUR = 6;
}

// console.log(`SPECIAL_START_HOUR = ${SPECIAL_START_HOUR} & SPECIAL_END_HOUR = ${SPECIAL_END_HOUR}`);

/**
 * 날짜를 yyyy-MM-dd 형식으로 변환 (시간 제거)
 * @param {Date} date - 변환할 날짜
 * @returns {string}
 */
function formatDateOnly(date) {
    return date.toISOString().split('T')[0];
}


/**
 * 현재 시간이 특정 범위 내에 있는지 체크 (04:00 ~ 06:00)
 * 그리고 특정 날짜 범위 내에 있는지 체크
 * @returns {boolean}
 */
function isSpecialTimeRange() {
    const now = new Date();

    // 날짜 비교를 위해 시간 정보를 제거한 문자열로 변환
    const today = formatDateOnly(now);
    const startDate = formatDateOnly(SPECIAL_DATE_RANGE.start);
    const endDate = formatDateOnly(SPECIAL_DATE_RANGE.end);

    // 날짜 범위 체크
    const isWithinDateRange = today >= startDate && today <= endDate;

    // 시간 범위 체크
    const currentHour = now.getHours();
    const isWithinTimeRange = currentHour >= SPECIAL_START_HOUR &&
        currentHour < SPECIAL_END_HOUR;

    // 디버깅을 위한 로그
    // console.log('날짜 체크:', {
    //     today,
    //     startDate,
    //     endDate,
    //     isWithinDateRange,
    //     currentHour,
    //     isWithinTimeRange
    // });

    return isWithinDateRange && isWithinTimeRange;
}


/**
 * 밀리초를 시:분:초 형식으로 변환
 * @param {number} milliseconds
 * @returns {string}
 */
function formatTimeDisplay(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':');
}


/**
 * 타이머 업데이트 메인 함수
 */
const timerElement = document.getElementById('timer');
const timerMainElement = document.getElementById('timerMain');
function updateTimer() {
    try {
        const now = Date.now();
        let targetTime = new Date(now);
        let timeRemaining;

        if (isSpecialTimeRange()) {
            targetTime.setHours(SPECIAL_END_HOUR, 0, 0, 0);
            timeRemaining = targetTime.getTime() - now;
        } else {
            targetTime.setHours(24, 0, 0, 0);
            timeRemaining = targetTime.getTime() - now;

            if (timeRemaining === 0) {
                timeRemaining = 24 * 60 * 60 * 1000;
            }
        }

        // DOM 업데이트를 한번에 처리
        const formattedTime = formatTimeDisplay(timeRemaining);
        if(timerElement) timerElement.textContent = formattedTime;
        if(timerMainElement) timerMainElement.textContent = formattedTime;

        const timerMain = document.getElementById('timerMain');
        if(timerMain) {
            timerMain.textContent = formattedTime;
        }

        // 1초마다 업데이트
        if (timeRemaining > 0) {
            setTimeout(updateTimer, 1000);
        }

    } catch (error) {
        console.error('타이머 업데이트 중 오류:', error);
    }
}

// 타이머 시작
updateTimer();


/**
 * 스크롤이 50% 이상 내려갔는지 체크하는 함수
 * @returns {boolean}
 */
function isScrollOverPercent(overPercent) {
    try {
        // 전체 문서 높이
        const documentHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        );

        // 현재 보이는 화면 높이
        const windowHeight = window.innerHeight;

        // 현재 스크롤 위치
        const scrollPosition = window.scrollY;

        // 스크롤 진행률 계산 (%)
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

        return scrollPercentage >= overPercent;
    } catch (error) {
        console.error('스크롤 위치 확인 중 오류:', error);
        return false;
    }
}

/**
 * 특정 요소가 화면에 보이는지 체크하는 함수
 */
function checkElementVisibility(callback) {
    try {
        const checkpoint = document.getElementById('observerCheck');
        if (!checkpoint) {
            console.log('체크포인트 요소가 존재하지 않습니다.');
            callback(false);
            return;
        }

        const options = {
            rootMargin: '0px',
            threshold: [1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // console.log('체크포인트가 화면 중앙에 있습니다!');
                    observer.disconnect(); // 관찰 중단
                    callback(true);
                } else {
                    // console.log('체크포인트가 화면에서 사라졌습니다.');
                    callback(false);
                }
            });
        }, options);

        observer.observe(checkpoint);

    } catch (error) {
        console.error('체크포인트 확인 중 오류:', error);
        callback(false);
    }
}





// 스크롤 이벤트 리스너 예시
// window.addEventListener('scroll', () => {
//     if (isScrollOverPercent(45)) {
//       // console.log('스크롤이 45%를 넘었습니다!');
//         // 여기에 원하는 동작 추가
//     }
// });



