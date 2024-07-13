import MessageSection from "../page_components/MessageSection"
import UserInteraction from "../page_components/UserInteraction"

const ChatSection = () => {
  return (
    <div className="h-screen">
        <MessageSection />
        <UserInteraction />
    </div>
  )
}

export default ChatSection