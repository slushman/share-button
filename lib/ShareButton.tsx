declare const window: Window;

type Classes = {
  button: string;
  icon: string;
};

interface ShareButtonProps {
  buttonLabel?: string;
  classes?: Classes;
  onCopyToClipboard?: () => void;
  onNoShare?: () => void;
  shareContent: string;
  shareTitle: string;
}

export const ShareButton = ({
  buttonLabel = "Share",
  classes,
  onCopyToClipboard,
  onNoShare,
  shareContent,
  shareTitle,
}: ShareButtonProps) => {
  const handleShare = () => {
    if ("canShare" in navigator) {
      window.navigator
        .share({
          title: shareTitle,
          text: shareContent,
        })
        .catch(console.error);
    } else if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(shareContent);
      onCopyToClipboard?.();
      console.log("Copied to clipboard!");
    } else {
      onNoShare?.();
    }
  };

  return (
    <button
      className={`border-2 rounded border-solid px-4 py-1 bg-darkblue flex ${classes?.button}`}
      onClick={handleShare}
    >
      <i className={`gg-share scale-75 mr-5 mt-2 ${classes?.icon}`} />
      {buttonLabel}
    </button>
  );
};
