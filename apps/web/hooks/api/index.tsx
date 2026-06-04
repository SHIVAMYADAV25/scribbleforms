"use client";
import { trpc } from "~/trpc/client";
import { useRouter } from "next/navigation";
import { useUIStore } from "../../store/ui.store";

/* ── AUTH HOOKS ─────────────────────────────────────────────── */
export const useMe = () =>
  trpc.auth.me.useQuery(undefined, { retry: false, staleTime: 5 * 60_000 });

export const useLogin = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { addNotification } = useUIStore();
  return trpc.auth.login.useMutation({
    onSuccess: () => { utils.auth.me.invalidate(); router.push("/dashboard"); },
    onError: (e) => {
      const code = (e.data as any)?.domainCode;
      addNotification({ type: "error", message: code === "INVALID_CREDENTIALS" ? "Wrong email or password." : e.message });
    },
  });
};

export const useSignup = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { addNotification } = useUIStore();
  return trpc.auth.signup.useMutation({
    onSuccess: () => { utils.auth.me.invalidate(); router.push("/dashboard"); },
    onError: (e) => {
      const code = (e.data as any)?.domainCode;
      addNotification({ type: "error", message: code === "EMAIL_TAKEN" ? "Email already in use." : e.message });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  return trpc.auth.logout.useMutation({
    onSuccess: () => { utils.auth.me.reset(); router.push("/login"); },
  });
};

export const useUpdateProfile = () => {
  const utils = trpc.useUtils();
  const { addNotification } = useUIStore();
  return trpc.auth.updateProfile.useMutation({
    onSuccess: () => { utils.auth.me.invalidate(); addNotification({ type: "success", message: "Profile saved!" }); },
    onError: () => addNotification({ type: "error", message: "Could not save profile." }),
  });
};

/* ── FORM HOOKS ─────────────────────────────────────────────── */
export const useFormList = (filters?: { status?: string; search?: string }) =>
  trpc.forms.list.useInfiniteQuery(
    { limit: 20, ...(filters?.status ? { status: filters.status as any } : {}), ...(filters?.search ? { search: filters.search } : {}) },
    { getNextPageParam: (last: any) => last.nextCursor, staleTime: 30_000 }
  );

export const useFormDetail = (id: string) =>
  trpc.forms.getById.useQuery({ id }, { enabled: !!id, staleTime: 0 });

export const usePublicForm = (slug: string) =>
  trpc.forms.getPublic.useQuery({ slug }, { enabled: !!slug, retry: false });

export const useCreateForm = () => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const { addNotification } = useUIStore();
  return trpc.forms.create.useMutation({
    onSuccess: (f) => { utils.forms.list.invalidate(); router.push(`/dashboard/forms/${f.id}/build`); },
    onError: (e) => addNotification({ type: "error", message: e.message }),
  });
};

export const useUpdateForm = (formId: string) => {
  const utils = trpc.useUtils();
  const { setAutosaveStatus } = useUIStore();
  return trpc.forms.update.useMutation({
    onMutate: () => setAutosaveStatus("saving"),
    onSuccess: () => { setAutosaveStatus("saved"); utils.forms.getById.invalidate({ id: formId }); },
    onError: () => setAutosaveStatus("error"),
  });
};

export const usePublishForm = (formId: string) => {
  const utils = trpc.useUtils();
  const { addNotification } = useUIStore();
  return trpc.forms.publish.useMutation({
    onSuccess: () => { utils.forms.getById.invalidate({ id: formId }); addNotification({ type: "success", message: "Form published!" }); },
    onError: (e) => addNotification({ type: "error", message: e.message }),
  });
};

export const useUnpublishForm = (formId: string) => {
  const utils = trpc.useUtils();
  const { addNotification } = useUIStore();
  return trpc.forms.unpublish.useMutation({
    onSuccess: () => { utils.forms.getById.invalidate({ id: formId }); addNotification({ type: "success", message: "Form unpublished." }); },
  });
};

export const useDeleteForm = () => {
  const utils = trpc.useUtils();
  const { addNotification } = useUIStore();
  return trpc.forms.delete.useMutation({
    onSuccess: () => { utils.forms.list.invalidate(); addNotification({ type: "success", message: "Form deleted." }); },
  });
};

export const useDuplicateForm = () => {
  const utils = trpc.useUtils();
  return trpc.forms.duplicate.useMutation({
    onSuccess: () => utils.forms.list.invalidate(),
  });
};

export const useExplore = () =>
  trpc.forms.explore.useInfiniteQuery({ limit: 12 }, { getNextPageParam: (last: any) => last.nextCursor });

/* ── FIELD HOOKS ─────────────────────────────────────────────── */
export const useAddField = (formId: string) => {
  const utils = trpc.useUtils();
  return trpc.fields.addField.useMutation({
    onSuccess: () => utils.forms.getById.invalidate({ id: formId }),
  });
};

export const useUpdateField = (formId: string) => {
  const utils = trpc.useUtils();
  const { setAutosaveStatus } = useUIStore();
  return trpc.fields.updateField.useMutation({
    onMutate: () => setAutosaveStatus("saving"),
    onSuccess: () => { setAutosaveStatus("saved"); utils.forms.getById.invalidate({ id: formId }); },
    onError: () => setAutosaveStatus("error"),
  });
};

export const useDeleteField = (formId: string) => {
  const utils = trpc.useUtils();
  return trpc.fields.deleteField.useMutation({
    onSuccess: () => utils.forms.getById.invalidate({ id: formId }),
  });
};

export const useReorderFields = (formId: string) => {
  const utils = trpc.useUtils();
  return trpc.fields.reorder.useMutation({
    onSuccess: () => utils.forms.getById.invalidate({ id: formId }),
  });
};

export const useDuplicateField = (formId: string) => {
  const utils = trpc.useUtils();
  return trpc.fields.duplicate.useMutation({
    onSuccess: () => utils.forms.getById.invalidate({ id: formId }),
  });
};

/* ── RESPONSE HOOKS ─────────────────────────────────────────── */
export const useResponseList = (formId: string, filters?: any) =>
  trpc.responses.list.useInfiniteQuery(
    { formId, limit: 25, ...filters },
    { getNextPageParam: (last: any) => last.nextCursor, enabled: !!formId }
  );

export const useResponseDetail = (responseId: string, enabled = true) =>
  trpc.responses.getById.useQuery({ responseId }, { enabled: !!responseId && enabled });

export const useDeleteResponse = (formId: string) => {
  const utils = trpc.useUtils();
  return trpc.responses.delete.useMutation({
    onSuccess: () => utils.responses.list.invalidate({ formId }),
  });
};

// export const useExportCsv = (formId: string) => {
//   const { addNotification } = useUIStore();
//   return trpc.responses.exportCsv.useMutation({
//     onSuccess: ({ exportJobId }: any) => addNotification({ type: "info", message: "Export started!" }),
//     onError: () => addNotification({ type: "error", message: "Export failed." }),
//   });
// };

/* ── ANALYTICS HOOKS ─────────────────────────────────────────── */
export const useDashboardSummary = () =>
  trpc.analytics.getDashboardSummary.useQuery(undefined, { staleTime: 60_000 });

export const useFormStats = (formId: string, startDate: string, endDate: string) =>
  trpc.analytics.getFormStats.useQuery(
    { formId, startDate, endDate, granularity: "day" },
    { enabled: !!formId, staleTime: 5 * 60_000 }
  );

export const useTrackEvent = () => trpc.analytics.track.useMutation();

/* ── THEME HOOKS ─────────────────────────────────────────────── */
export const useThemeList = () =>
  trpc.themes.list.useQuery({ includeSystem: true, includeUser: true }, { staleTime: 10 * 60_000 });

export const useApplyTheme = (formId: string) => {
  const utils = trpc.useUtils();
  const { addNotification } = useUIStore();
  return trpc.themes.applyToForm.useMutation({
    onSuccess: () => { utils.forms.getById.invalidate({ id: formId }); addNotification({ type: "success", message: "Theme applied!" }); },
  });
};