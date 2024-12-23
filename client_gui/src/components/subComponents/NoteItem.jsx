import { Card, Flex, Metric, Subtitle } from "@tremor/react"
import EllipsisMenu from "../EllipsisMenu";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

const NoteItem = (props) => {
    const navigate = useNavigate();

    const click = () => {
        navigate(`/note-detail/${props.note.id}`);
    }
    return (
        <>
            <Card
                className="w-xs h-72 hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 relative"
                decoration="left" decorationColor="indigo"
                onClick={click}>

                <Flex justifyContent="between" alignItems="center" className="w-xs h-24">
                    <Metric>{props.note.name}</Metric>
                    <div onClick={(e) => e.stopPropagation()}>
                        <EllipsisMenu elementName="Note" elementId={props.note.id}
                            isLock={props.note.isLock} suggestion={props.note.passwordSuggestion} />
                    </div>
                </Flex>

                {props.note.isLock ? (
                    <Flex justifyContent="center" alignItems="center" className="w-full h-36">
                        <button className="border-none bg-transparent focus:outline-none">
                            <LockClosedIcon className="h-6 w-12 text-gray-500" />
                        </button>
                    </Flex>
                ) : (
                    <>
                        <div className="flex flex-col justify-start">
                            <Subtitle className="line-clamp-6"><span className="text-gray-500">{props.note.summaryDisplayText}</span></Subtitle>
                        </div>
                    </>
                )}
            </Card >
        </>
    )
}

export default NoteItem;