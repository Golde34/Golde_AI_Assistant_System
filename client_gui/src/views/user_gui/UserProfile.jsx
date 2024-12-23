import { Button, Card, Col, Flex, Grid, Metric, Subtitle, Text, Title } from "@tremor/react";
import Template from "../../components/template/Template"
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import RadioButtonIcon from "../../components/icons/RadioButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import { isAccessTokenCookieValid } from "../../kernels/utils/cookie-utils";
import { userProfile } from "../../api/store/actions/auth_service/user.actions";
import MessageBox from "../../components/subComponents/MessageBox";
import { useUpdateUserSettingDispatch } from "../../kernels/utils/write-dialog-api-requests";

function ContentArea() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = "1";

    const isUserValid = isAccessTokenCookieValid();
    useEffect(() => {
        if (isUserValid) {
            navigate('/signin');
        }
    }, [isUserValid, navigate]);

    const profile = useSelector(state => state.userDetail);
    const { loading, error, user } = profile;
    const getUserProfile = useCallback(() => {
        dispatch(userProfile(userId));
    }, [dispatch, userId]);
    const debounceRef = useRef(null);
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            getUserProfile();
        }, 200);
    }, [])

    const [optimizedTaskConfig, setOptimizedTaskConfig] = useState('1');
    const [privateProfileConfig, setPrivateProfileConfig] = useState('1');
    const [taskSortingAlgorithm, setTaskSortingAlgorithm] = useState('1');
    const [autoOptimizeConfig, setAutoOptimizeConfig] = useState('1');

    const [initialSettings, setInitialSettings] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    // Update state based on user data once user is loaded
    useEffect(() => {
        if (user && user.userSetting) {
            const initial = {
                optimizedTaskConfig: user.userSetting.optimizedTaskConfig?.toString() || '1',
                privateProfileConfig: user.userSetting.privateProfileConfig?.toString() || '1',
                taskSortingAlgorithm: user.userSetting.taskSortingAlgorithm?.toString() || '1',
                autoOptimizeConfig: user.userSetting.autoOptimizeConfig?.toString() || '1',
            };
            setOptimizedTaskConfig(initial.optimizedTaskConfig);
            setPrivateProfileConfig(initial.privateProfileConfig);
            setTaskSortingAlgorithm(initial.taskSortingAlgorithm);
            setAutoOptimizeConfig(initial.autoOptimizeConfig);

            setInitialSettings(initial);
        }
    }, [user]);
    useEffect(() => {
        if (initialSettings) {
            const hasChanged =
                optimizedTaskConfig !== initialSettings.optimizedTaskConfig ||
                privateProfileConfig !== initialSettings.privateProfileConfig ||
                taskSortingAlgorithm !== initialSettings.taskSortingAlgorithm ||
                autoOptimizeConfig !== initialSettings.autoOptimizeConfig;
            setIsChanged(hasChanged);
        }
    }, [optimizedTaskConfig, privateProfileConfig, taskSortingAlgorithm, autoOptimizeConfig, initialSettings]);


    const [userSetting, setUserSetting] = useState({});
    const updateUserSetting = useUpdateUserSettingDispatch();
    const setUserSettingObject = (optimizedTaskConfig, privateProfileConfig, taskSortingAlgorithm, autoOptimizeConfig) => {
        if (!isChanged) {
            return;
        }
        userSetting.userId = user.id;
        userSetting.optimizedTaskConfig = Number(optimizedTaskConfig);
        userSetting.privateProfileConfig = Number(privateProfileConfig);
        userSetting.taskSortingAlgorithm = Number(taskSortingAlgorithm);
        userSetting.autoOptimizeConfig = Number(autoOptimizeConfig);
        console.log(userSetting);
        updateUserSetting(userSetting);
        window.location.reload();
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <MessageBox message={error}></MessageBox>
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className='text-2xl font-bold text-gray-800'>User Profile</Metric>
                    <div className="grid md:grid-cols-5 grid-cols-1 w-full">
                        <div className="col-span-2">
                            <div className="w-full flex flex-col justify-between p-2">
                                <div className="flex-auto w-full">
                                    <Card>
                                        <Flex>
                                            <Title>Your profile</Title>
                                        </Flex>
                                        <Grid className="mt-4" numItems={5}>
                                            <Col numColSpan={1}>
                                                <Subtitle>Username</Subtitle>

                                            </Col>
                                            <Col numColSpan={4}>
                                                <Text className="text-white text-md">{user.name}</Text>
                                            </Col>

                                            <Col numColSpan={1}>
                                                <Subtitle>Email</Subtitle>
                                            </Col>
                                            <Col numColSpan={4}>
                                                <Text className="text-white text-md">{user.email}</Text>
                                            </Col>

                                            <Col numColSpan={1}>
                                                <Subtitle>Last Login</Subtitle>
                                            </Col>
                                            <Col numColSpan={4}>
                                                <Text className="text-white text-md">{user.lastLogin}</Text>
                                            </Col>

                                            <Col numColSpan={1}>
                                                <Subtitle>Is Using 2FA</Subtitle>
                                            </Col>
                                            <Col numColSpan={4}>
                                                <Text className="text-white text-md">Coming soon</Text>
                                            </Col>

                                            <Col numColSpan={1}>
                                                <Subtitle>Role</Subtitle>
                                            </Col>
                                            <Col numColSpan={4}>
                                                <Text>{user.roles[0].name}</Text>
                                            </Col>

                                        </Grid>
                                        <div className="flex justify-end p-2 rounded-lg mb-4">
                                            <Button
                                                className="flex justify-end"
                                                variant="primary"
                                                color="indigo"
                                                onClick={() => {
                                                    navigate('/privilege-role-dashboard');
                                                }}
                                            > Privilege And Role Dashboard</Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 w-full">
                            <div className='w-full p-2'>
                                <Card className='max-w-full mx-auto'>
                                    <Flex>
                                        <Title>User Setting</Title>
                                    </Flex>
                                    <Grid numItems={1} className="mt-4">
                                        <Col numColSpan={1}>
                                            <Subtitle>Private Profile</Subtitle>
                                        </Col>
                                        <Col numColSpan={1}>
                                            <div className="grid grid-cols-2 m-1">
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="profile-radio-public" data-ripple-dark="true">
                                                        <input
                                                            id="profile-radio-public"
                                                            type="radio"
                                                            value="1"
                                                            checked={privateProfileConfig === '1'}
                                                            onChange={(e) => setPrivateProfileConfig(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400 me-4" htmlFor="profile-radio-public">
                                                        Public
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="profile-radio-private" data-ripple-dark="true">
                                                        <input
                                                            id="profile-radio-private"
                                                            type="radio"
                                                            value="0"
                                                            checked={privateProfileConfig === '0'}
                                                            onChange={(e) => setPrivateProfileConfig(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-red-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-red-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-red-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400" htmlFor="profile-radio-private">
                                                        Private
                                                    </label>
                                                </div>
                                            </div>
                                        </Col>

                                        <Col numColSpan={1}>
                                            <Subtitle>Optimize Task Config</Subtitle>
                                        </Col>
                                        <div className="grid grid-cols-4 m-1">
                                            <div className="inline-flex items-center">
                                                <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                    htmlFor="optimize-task-radio-1" data-ripple-dark="true">
                                                    <input
                                                        id="optimize-task-radio-1"
                                                        type="radio"
                                                        value="1"
                                                        checked={optimizedTaskConfig === '1'}
                                                        onChange={(e) => setOptimizedTaskConfig(e.target.value)}
                                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-indigo-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-indigo-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
                                                    />
                                                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-indigo-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <RadioButtonIcon />
                                                    </div>
                                                </label>
                                                <label className="text-sm text-gray-400 me-4" htmlFor="optimize-task-radio-1">
                                                    Optimize all tasks
                                                </label>
                                            </div>
                                            <div className="inline-flex items-center">
                                                <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                    htmlFor="optimize-task-radio-2" data-ripple-dark="true">
                                                    <input
                                                        id="optimize-task-radio-2"
                                                        type="radio"
                                                        value="2"
                                                        checked={optimizedTaskConfig === '2'}
                                                        onChange={(e) => setOptimizedTaskConfig(e.target.value)}
                                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-indigo-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-indigo-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
                                                    />
                                                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-indigo-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <RadioButtonIcon />
                                                    </div>
                                                </label>
                                                <label className="text-sm text-gray-400" htmlFor="optimize-task-radio-2">
                                                    Optimize registered tasks in day
                                                </label>
                                            </div>
                                            <div className="inline-flex items-center">
                                                <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                    htmlFor="optimize-task-radio-3" data-ripple-dark="true">
                                                    <input
                                                        id="optimize-task-radio-3"
                                                        type="radio"
                                                        value="3"
                                                        checked={optimizedTaskConfig === '3'}
                                                        onChange={(e) => setOptimizedTaskConfig(e.target.value)}
                                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-indigo-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-indigo-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
                                                    />
                                                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-indigo-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <RadioButtonIcon />
                                                    </div>
                                                </label>
                                                <label className="text-sm text-gray-400" htmlFor="optimize-task-radio-3">
                                                    Optimize tasks by type
                                                </label>
                                            </div>
                                            <div className="inline-flex items-center">
                                                <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                    htmlFor="optimize-task-radio-4" data-ripple-dark="true">
                                                    <input
                                                        id="optimize-task-radio-4"
                                                        type="radio"
                                                        value="4"
                                                        checked={optimizedTaskConfig === '4'}
                                                        onChange={(e) => setOptimizedTaskConfig(e.target.value)}
                                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-indigo-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-indigo-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
                                                    />
                                                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-indigo-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <RadioButtonIcon />
                                                    </div>
                                                </label>
                                                <label className="text-sm text-gray-400" htmlFor="optimize-task-radio-4">
                                                    Disable Task Optimization
                                                </label>
                                            </div>
                                        </div>

                                        <Col numColSpan={1}>
                                            <Subtitle>Task Sorting Algorithm</Subtitle>
                                        </Col>
                                        <Col numColSpan={1}>
                                            <div className="grid grid-cols-4 m-1">
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="tsa-radio-1" data-ripple-dark="true">
                                                        <input
                                                            id="tsa-radio-1"
                                                            type="radio"
                                                            value="1"
                                                            checked={taskSortingAlgorithm === '1'}
                                                            onChange={(e) => setTaskSortingAlgorithm(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400 me-4" htmlFor="tsa-radio-1">
                                                        Priority
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="tsa-radio-2" data-ripple-dark="true">
                                                        <input
                                                            id="tsa-radio-2"
                                                            type="radio"
                                                            value="2"
                                                            checked={taskSortingAlgorithm === '2'}
                                                            onChange={(e) => setTaskSortingAlgorithm(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400 me-4" htmlFor="tsa-radio-2">
                                                        Time
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="tsa-radio-3" data-ripple-dark="true">
                                                        <input
                                                            id="tsa-radio-3"
                                                            type="radio"
                                                            value="3"
                                                            checked={taskSortingAlgorithm === '3'}
                                                            onChange={(e) => setTaskSortingAlgorithm(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400 me-4" htmlFor="tsa-radio-3">
                                                        Time and Priority
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="tsa-radio-4" data-ripple-dark="true">
                                                        <input
                                                            id="tsa-radio-4"
                                                            type="radio"
                                                            value="4"
                                                            checked={taskSortingAlgorithm === '4'}
                                                            onChange={(e) => setTaskSortingAlgorithm(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400" htmlFor="tsa-radio-4">
                                                        Tabu Search
                                                    </label>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col numColSpan={1}>
                                            <Subtitle>Auto Optimize Config</Subtitle>
                                        </Col>
                                        <Col numColSpan={1}>
                                            <div className="grid grid-cols-3 m-1">
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="apc-radio-1" data-ripple-dark="true">

                                                        <input
                                                            id="apc-radio-1"
                                                            type="radio"
                                                            value="1"
                                                            checked={autoOptimizeConfig === '1'}
                                                            onChange={(e) => setAutoOptimizeConfig(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-yellow-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-yellow-gray-500 before:opacity-0 before:transition-opacity checked:border-yellow-500 checked:before:bg-yellow-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-yellow-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400 me-4" htmlFor="tsa-radio-1">
                                                        Optimize when creating task
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="apc-radio-2" data-ripple-dark="true">
                                                        <input
                                                            id="apc-radio-2"
                                                            type="radio"
                                                            value="2"
                                                            checked={autoOptimizeConfig === '2'}
                                                            onChange={(e) => setAutoOptimizeConfig(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-yellow-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-yellow-gray-500 before:opacity-0 before:transition-opacity checked:border-yellow-500 checked:before:bg-yellow-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-yellow-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400" htmlFor="apc-radio-2">
                                                        Optimize in fixed time
                                                    </label>
                                                </div>
                                                <div className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                        htmlFor="apc-radio-3" data-ripple-dark="true">
                                                        <input
                                                            id="apc-radio-3"
                                                            type="radio"
                                                            value="3"
                                                            checked={autoOptimizeConfig === '3'}
                                                            onChange={(e) => setAutoOptimizeConfig(e.target.value)}
                                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-yellow-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-yellow-gray-500 before:opacity-0 before:transition-opacity checked:border-yellow-500 checked:before:bg-yellow-500 hover:before:opacity-10"
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-yellow-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <RadioButtonIcon />
                                                        </div>
                                                    </label>
                                                    <label className="text-sm text-gray-400" htmlFor="apc-radio-3">
                                                        Disable Auto Optimize
                                                    </label>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col numColSpan={1}>
                                            <div className="flex justify-end mt-4">
                                                <Button
                                                    className="p-2 rounded-lg mb-4"
                                                    variant="primary"
                                                    color="indigo"
                                                    onClick={() => {
                                                        setUserSettingObject(optimizedTaskConfig, privateProfileConfig, taskSortingAlgorithm, autoOptimizeConfig);
                                                    }}
                                                > Save Settings</Button>
                                            </div></Col>
                                    </Grid>
                                </Card>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
    )
}

const UserProfile = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default UserProfile;