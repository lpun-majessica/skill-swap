import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillDisplay } from "@/components/UserCard/SkillDisplay";

// Tự viết lại hàm rút gọn bio nếu muốn giữ lại
function shortenBio(bio, maxLength = 50) {
    return bio.length <= maxLength ? bio : bio.slice(0, maxLength) + "...";
}

export function UserCardDemo({ id, fullname, username, skillsToTeach, skillsToLearn, bio }) {
    const fallbackName = fullname
        .split(" ")
        .map((w) => w[0].toUpperCase())
        .join("");

    return (
        <Card className="relative w-3xs lg:w-2xs bg-ss-light-777 dark:bg-ss-black-131">
            <Avatar className="-mt-1 lg:mt-0 size-16 lg:size-18 mx-auto">
                <AvatarImage src={`pfp/${id}.jpeg`} alt={"@" + username} />
                <AvatarFallback className="bg-ss-light-333 dark:bg-ss-black-444">
                    {fallbackName}
                </AvatarFallback>
            </Avatar>

            <CardHeader>
                <CardTitle className="text-center -mt-3 -mb-1 text-lg lg:text-xl font-bold text-ss-black-222 dark:text-ss-light-555">
                    {fullname}
                </CardTitle>
                <CardDescription className="w-[95cqw] m-auto">
                    <p className="truncate text-center text-xs text-ss-black-929 dark:text-ss-light-222">
                        {shortenBio(bio)}
                    </p>
                </CardDescription>
            </CardHeader>

            <CardContent className="relative -mt-2 -mb-1">
                <SkillDisplay
                    fullname={fullname}
                    header="Teaching"
                    skills={skillsToTeach}
                    currentUserSkills={[]} // Không so sánh
                />
                <hr className="mt-3 mb-1 border-ss-light-333 dark:border-ss-black-444" />
                <SkillDisplay
                    fullname={fullname}
                    header="Learning"
                    skills={skillsToLearn}
                    currentUserSkills={[]} // Không so sánh
                />
            </CardContent>

            <CardFooter className="flex flex-row -mb-1 lg:mb-0 flex-wrap justify-center gap-2">
                {/* Giả lập nút Connect chỉ để trưng bày */}
                <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-full font-semibold">
                    Connect +
                </button>
            </CardFooter>
        </Card>
    );
}
