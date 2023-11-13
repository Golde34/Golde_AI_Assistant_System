import { useDispatch, useSelector } from "react-redux";
import Template from "./template";
import { useEffect } from "react";
import { getGroupTaskList } from "../store/actions/task_manager/group-task.actions";
import { useParams } from "react-router-dom";
import { Metric, Text } from "@tremor/react";
import TabGroupTask from "../components/taskDashboard/TabGroupTask";
import TaskList from "../components/taskDashboard/TaskList";

function ContentArea() {
    const projectId = useParams().id;
    const dispatch = useDispatch();

    const listGroupTasks = useSelector((state) => state.groupTaskList);
    const { loading, error, groupTasks } = listGroupTasks;

    useEffect(() => {
        dispatch(getGroupTaskList(projectId));
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800"> Group Tasks
                    </Metric>
                    <TabGroupTask groupTasks={groupTasks} >
                        <TaskList groupTasks={groupTasks}></TaskList>
                    </TabGroupTask>
                </>
            )
            }
        </div>
    )
}

const TaskDashboard = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    );
}

export default TaskDashboard;