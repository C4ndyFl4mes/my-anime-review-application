import type { IGlobalMessage } from "../../interfaces/IGlobalMessage";

type Props = IGlobalMessage & {
    isExiting: boolean;
};

// This component displays a global message at the top of the screen, which can be either a success or failure message.
// The message will automatically disappear after a certain duration, and it will have an exit animation when it is being removed from the view.
export default function GlobalMessageDisplay({ success, message, isExiting }: Props) {
    const animationClass = isExiting ? "global-message-exit" : "global-message-enter";

    return success
        ? <SuccessMessage message={message} animationClass={animationClass} />
        : <FailureMessage message={message} animationClass={animationClass} />
};

function SuccessMessage({ message, animationClass }: { message: string; animationClass: string }) {
    return (
        <div className={"fixed top-0 sm:top-auto sm:bottom-0 left-0 w-screen flex justify-center sm:justify-end " + animationClass}>
            <span className="accept-button-bg-color rounded-md p-2 m-4">{message}</span>
        </div>
    );
}

function FailureMessage({ message, animationClass }: { message: string; animationClass: string }) {
    return (
        <div className={"fixed top-0 sm:top-auto sm:bottom-0 left-0 w-screen flex justify-center sm:justify-end " + animationClass}>
            <span className="cancel-button-bg-color rounded-md p-2 m-4">{message}</span>
        </div>
    );
}