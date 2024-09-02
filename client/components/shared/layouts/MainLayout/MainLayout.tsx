import { FC } from "react";
import Head from "next/head";

import styles from "./MainLayout.module.scss";
import { Container } from "@mui/material";
import MainNavigation from "../../navigation/MainNavigation/MainNavigation";

interface MainLayoutProps {
    children: JSX.Element;
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: FC<MainLayoutProps> = ({
    children,
    title,
    description,
    keywords
}) => {
    return (
        <>
            <Head>
                <title>{title || 'Tasks'}</title>
                <meta name="description" content={`Description...` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Tasks"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <MainNavigation/>
            <Container className={styles["main-container"]}>
                {children}
            </Container>
        </>
    );
};

export default MainLayout;
