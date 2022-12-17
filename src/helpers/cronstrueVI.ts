import { Locale } from 'cronstrue';
import ExpressionDescriptor from 'cronstrue';
class vi implements Locale {
    atX0SecondsPastTheMinuteGt20(): string | null {
        return null;
    }
    atX0MinutesPastTheHourGt20(): string | null {
        return null;
    }
    commaMonthX0ThroughMonthX1(): string | null {
        return null;
    }
    commaYearX0ThroughYearX1(): string | null {
        return null;
    }

    use24HourTimeFormatByDefault() {
        return false;
    }

    anErrorOccuredWhenGeneratingTheExpressionD() {
        return "Đã xảy ra lỗi khi tạo mô tả biểu thức. Kiểm tra cú pháp cron expression.";
    }
    everyMinute() {
        return "mỗi phút";
    }
    everyHour() {
        return "mỗi giờ";
    }
    atSpace() {
        return "Lúc ";
    }
    everyMinuteBetweenX0AndX1() {
        return "Mỗi phút giữa %s và %s";
    }
    at() {
        return "Lúc";
    }
    spaceAnd() {
        return " và";
    }
    everySecond() {
        return "mỗi giây";
    }
    everyX0Seconds() {
        return "mỗi %s giây";
    }
    secondsX0ThroughX1PastTheMinute() {
        return "giây %s đến %s qua mỗi phút";
    }
    atX0SecondsPastTheMinute() {
        return "giây thứ %s qua mỗi phút";
    }
    everyX0Minutes() {
        return "mỗi %s phút";
    }
    minutesX0ThroughX1PastTheHour() {
        return "giây %s đến %s qua mỗi giờ";
    }
    atX0MinutesPastTheHour() {
        return "phút thứ %s qua mỗi giờ";
    }
    everyX0Hours() {
        return "mỗi %s giờ";
    }
    betweenX0AndX1() {
        return "giữa %s và %s";
    }
    atX0() {
        return "lúc %s";
    }
    commaEveryDay() {
        return ", mỗi ngày";
    }
    commaEveryX0DaysOfTheWeek() {
        return ", mỗi %s ngày trong tuần";
    }
    commaX0ThroughX1() {
        return ", %s đến %s";
    }
    commaAndX0ThroughX1() {
        return ", %s đến %s";
    }
    first() {
        return "thứ nhất";
    }
    second() {
        return "thứ hai";
    }
    third() {
        return "thứ ba";
    }
    fourth() {
        return "thứ tư";
    }
    fifth() {
        return "thứ năm";
    }
    commaOnThe() {
        return ", on the ";
    }
    spaceX0OfTheMonth() {
        return " %s của tháng";
    }
    lastDay() {
        return "ngày cuối cùng";
    }
    commaOnTheLastX0OfTheMonth() {
        return ", vào %s cuối cùng của tháng";
    }
    commaOnlyOnX0() {
        return ", chỉ vào lúc %s";
    }
    commaAndOnX0() {
        return ", và %s";
    }
    commaEveryX0Months() {
        return ", mỗi %s tháng";
    }
    commaOnlyInX0() {
        return ", chỉ trong %s";
    }
    commaOnTheLastDayOfTheMonth() {
        return ", vào ngày cuối cùng của tháng";
    }
    commaOnTheLastWeekdayOfTheMonth() {
        return ", vào ngày cuối tuần của tháng";
    }
    commaDaysBeforeTheLastDayOfTheMonth() {
        return ", %s ngày trước ngày cuối cùng của tháng";
    }
    firstWeekday() {
        return "ngày đầu tuần";
    }
    weekdayNearestDayX0() {
        return "ngày trong tuần ngày gần nhất %s";
    }
    commaOnTheX0OfTheMonth() {
        return ", vào %s của tháng";
    }
    commaEveryX0Days() {
        return ", mỗi %s ngày";
    }
    commaBetweenDayX0AndX1OfTheMonth() {
        return ", giữa ngày %s và %s của tháng";
    }
    commaOnDayX0OfTheMonth() {
        return ", vào ngày %s của tháng";
    }
    commaEveryHour() {
        return ", mỗi giờ";
    }
    commaEveryX0Years() {
        return ", mỗi %s năm";
    }
    commaStartingX0() {
        return ", bắt đầu %s";
    }
    daysOfTheWeek() {
        return ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    }
    monthsOfTheYear() {
        return [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ];
    }
}

class viLocaleLoader {
    load(availableLocales: { [name: string]: Locale }) {
        availableLocales["vi"] = new vi();
    }
}

ExpressionDescriptor.initialize(new viLocaleLoader());
let cronstrueToString = ExpressionDescriptor.toString;
export { cronstrueToString };