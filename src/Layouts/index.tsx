import RouteView, { IRouteViewProps } from "./../Route";
import { History } from "history";
import styles from './_styles.module.less';

interface ILayoutProps extends IRouteViewProps {
  history: History;
}
const Layout = (props: ILayoutProps) => {
  return (
    <div className={styles.layout}>
      <RouteView {...props} />
    </div>
  );
};

export default Layout;