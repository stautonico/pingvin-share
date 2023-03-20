import {
    Button,
    Container,
    createStyles,
    Group,
    List,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {TbCheck} from "react-icons/tb";
import Logo from "../components/Logo";
import Meta from "../components/Meta";
import useUser from "../hooks/user.hook";
import {FormattedMessage} from "react-intl";
import {useIntl} from "react-intl";


const useStyles = createStyles((theme) => ({
    inner: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: `calc(${theme.spacing.md} * 4)`,
        paddingBottom: `calc(${theme.spacing.md} * 4)`,
    },

    content: {
        maxWidth: 480,
        marginRight: `calc(${theme.spacing.md} * 3)`,

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan("xs")]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            flex: 1,
        },
    },

    image: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    highlight: {
        position: "relative",
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
                : theme.colors[theme.primaryColor][0],
        borderRadius: theme.radius.sm,
        padding: "4px 12px",
    },
}));

export default function Home() {
    const {classes} = useStyles();
    const {refreshUser} = useUser();
    const router = useRouter();
    const intl = useIntl();

    // If the user is already logged in, redirect to the upload page
    useEffect(() => {
        refreshUser().then((user) => {
            if (user) {
                // router.replace("/upload");
            }
        });
    }, []);

    console.log(intl.formatMessage({id: "home.title"}));

    return (
        <>
            <Meta title="Home"/>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>



                            {/* FIXME: This really upsets me but I couldn't find a better way to do this */}
                            <FormattedMessage id="home.title.a" />  <span className={classes.highlight}><FormattedMessage id="home.title.b" /></span> <br />{" "}
                            <FormattedMessage id="home.title.c" />



                            {/* FIXME: I'm leaving this here just to document past attempts for future reference */}
                            {/*<FormattedMessage as="div" id="home.title" />*/}

                            {/*<div dangerouslySetInnerHTML={{ __html: intl.formatMessage({id: "home.title"}) }} />*/}
                            {/*<div dangerouslySetInnerHTML={{*/}
                            {/*    // __html: "<FormattedMessage id=\"home.title\" />"*/}
                            {/*    __html: intl.formatMessage({id: "home.title"})*/}
                            {/*}} />*/}
                            {/* END PAST ATTEMPTS */}

                        </Title>
                        <Text color="dimmed" mt="md">
                            <FormattedMessage id="home.description" />
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <TbCheck size={12}/>
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <div>
                                    <b><FormattedMessage id="home.bullet.a.name" /></b> - <FormattedMessage id="home.bullet.a.description" />
                                </div>
                            </List.Item>
                            <List.Item>
                                <div>
                                    <b><FormattedMessage id="home.bullet.b.name" /></b> - <FormattedMessage id="home.bullet.b.description" />
                                </div>
                            </List.Item>
                            <List.Item>
                                <div>
                                    <b><FormattedMessage id="home.bullet.c.name" /></b> - <FormattedMessage id="home.bullet.c.description" />
                                </div>
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button
                                component={Link}
                                href="/auth/signUp"
                                radius="xl"
                                size="md"
                                className={classes.control}
                            >
                                <FormattedMessage id="home.button.start" />
                            </Button>
                            <Button
                                component={Link}
                                href="https://github.com/stonith404/pingvin-share"
                                target="_blank"
                                variant="default"
                                radius="xl"
                                size="md"
                                className={classes.control}
                            >
                                <FormattedMessage id="home.button.source" />
                            </Button>
                        </Group>
                    </div>
                    <Group className={classes.image} align="center">
                        <Logo width={200} height={200}/>
                    </Group>
                </div>
            </Container>
        </>
    );
}
