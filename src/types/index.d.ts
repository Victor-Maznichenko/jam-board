type UnknownObject<T = unknown> = Record<string, T>;

namespace Api {
  type FirebaseError = {
    code: number;
    errors: Error[];
    message: string;
  };

  type DocFields = UnknownObject<UnknownObject>;

  interface Document {
    name: string;
    createTime: string;
    updateTime: string;
    fields: DocFields;
  }

  interface RunQuery {
    transaction: string;
    document: Document;
    readTime: string;
    skippedResults: number;
    explainMetrics: UnknownObject;
    done: boolean;
  }

  interface ListDocuments {
    documents: Document[];
    nextPageToken: string;
  }

  interface LoginData {
    email: string;
    password: string;
  }

  interface RegisterData {
    email: string;
    password: string;
    displayName: string;
  }

  interface User {
    uid: string;
    email: string;
    role: UserRole;
    displayName: string;
  }

  interface UpdateRequestParams {
    path: string;
    body: UnknownObject;
  }

  interface CreateDocByIdParams {
    path: string;
    id: string;
  }

  interface Project {
    id: string;
    title: string;
    currentColor: string;
    tasks: Record<string, Task[]>;
  }

  interface Task {
    id: string;
    title: string;
    projectID: string;
    authorName: string;
    performerName?: string;
    performerUID?: string;
    status: TaskStatus;
    description: string;
    deadlineDate?: string;
    completedDate?: string;
  }

  interface PatchedTask extends Partial<Task> {
    id: string;
    projectID: string;
    status: TaskStatus;
  }

  interface BuildUrlParams {
    baseURL?: string;
    path?: string;
    params?: UnknownObject;
  }

  interface SimpleFetchParams extends Omit<BuildUrlParams, 'path'> {
    options?: RequestInit;
  }

  interface RequestParams extends BuildUrlParams {
    method: FetchMethod;
    body?: UnknownObject | null;
  }
}

namespace Client {}
