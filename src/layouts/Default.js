// @flow
import React, { useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';

// utils
import { changeBodyAttribute } from '../utils';

const loading = () => <div className=""></div>;

type DefaultLayoutProps = {
    layout: {
        layoutType: string,
        layoutColor: string,
        layoutWidth: string,
        leftSideBarTheme: string,
        leftSideBarType: string,
        showRightSidebar: boolean,
    },
    user: any,
    children?: any,
};

const DefaultLayout = (props: DefaultLayoutProps): React$Element<any> => {
    const { layoutColor } = useSelector((state) => ({
        layoutColor: state.Layout.layoutColor,
    }));

    useEffect(() => {
        changeBodyAttribute('data-layout-color', layoutColor);
    }, [layoutColor]);

    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        };
    }, []);

    // get the child view which we would like to render
    const children = props.children || null;

    return (
        <>
            <Suspense fallback={loading()}>{children}</Suspense>
        </>
    );
};
export default DefaultLayout;
