import ProjectsList from './parts/ProjectsList';
import styles from './ProjectsPage.module.scss';

const ProjectsPage = () => (
  <div className="container">
    <main className={styles.projects}>
      <h2 className={styles.title}>Проекты:</h2>
      <ProjectsList />
    </main>
  </div>
);

export default ProjectsPage;
