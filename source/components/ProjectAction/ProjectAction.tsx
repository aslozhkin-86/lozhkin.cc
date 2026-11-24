import styles from "./ProjectAction.module.css";

type ProjectActionProps = {
  href: string;
  children: React.ReactNode;
};

export function ProjectAction({ href, children }: ProjectActionProps) {
  return <a className={styles.action} href={href}>{children}</a>;
}
