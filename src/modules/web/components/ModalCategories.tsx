import AppModal from "@/modules/core/components/AppModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NewCategoriesForm, useCategoriesSchema } from "../validations/categoriesSchema";
import AppInput from "@/modules/core/components/AppInput";
import { useCreteCategory, useGetCategory, useUpdateCategory } from "@/modules/admin/hooks/categories/hook";
import AppLoading from "@/modules/core/components/AppLoading";
import { showError } from "@/modules/core/utilities/errors";
import { useAppToast } from "@/modules/core/hooks/useAppToast";
import { useEffect, useState } from "react";
import { AppInputFile } from "@/modules/core/components/AppInputFile";
import { appLoadImage } from "@/modules/core/utilities/img/convert";

type ModalCategoriesProps = {
    isOpen: boolean;
    onClose: CallableFunction;
    isEdit?: boolean;
    id?: null | number | string;
};

export const ModalCategories: React.FC<ModalCategoriesProps> = ({ isOpen, onClose, isEdit = false, id = null }) => {
    const [t] = useTranslation('web');
    const [tCore] = useTranslation('core');
    const [previewIcon, setPreviewIcon] = useState('');
    const schema = useCategoriesSchema();
    const { create } = useCreteCategory();
    const { update } = useUpdateCategory(id);

    const { data: category, isLoading: isCategoryLoading } = useGetCategory(id);
    const { show } = useAppToast();

    const { control, watch, handleSubmit, reset } = useForm<NewCategoriesForm>({
        resolver: zodResolver(schema)
    });

   

    const save: SubmitHandler<NewCategoriesForm> = (data) => {

        if (isEdit) {
            update.mutate(data, {
                onSuccess(response) {
                    show({ message: tCore('messages.success.category.created'), status: 'success' });
                    reset({
                        icon: response.icon,
                        name: response.name
                    });
                    onClose();
                },
                onError(error) {
                    showError(error);
                },
            });
            return;
        }

        create.mutate(data, {
            onSuccess() {
                show({ message: tCore('messages.success.category.created'), status: 'success' });
                reset({
                    icon: '',
                    name: ''
                });
                setPreviewIcon('');
                onClose();
            },
            onError(error) {
                showError(error);
            },
        });
    };


    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                icon: category.icon
            });
            setPreviewIcon(appLoadImage(category.icon));
        }

        if (!id) {
            reset({
                name: undefined,
                icon: undefined
            });
            setPreviewIcon('');
        }
    }, [isEdit, category]);

    console.log(watch());

    return (
        <>
            <AppLoading isOpen={create.isPending || update.isPending} />
            <AppModal
                open={isOpen}
                onClose={() => onClose()}
                title={isEdit ? t('titles.edit-category') : t('titles.new-category')}
                sizeModal="3xl"
            >
                <div className="w-full">
                    <form onSubmit={handleSubmit(save)}>
                        <div className="flex">
                            <div className="w-8/12">

                                <AppInput
                                    labelStrong
                                    control={control}
                                    inputProps={{
                                        name: 'name',
                                        placeholder: t('register.inputs.category-name.placeholder')
                                    }}
                                    label={t('register.inputs.category-name.label')}
                                    loading={isCategoryLoading}
                                />

                                <AppInputFile
                                    name="icon"
                                    label={t('register.inputs.category-icon.label')}
                                    control={control}
                                    labelStrong
                                    render={(file, filePreview) => {
                                        if (file) {
                                            setPreviewIcon(filePreview);
                                        }
                                    }}
                                />

                            </div>
                            <div className="w-4/12">
                                <div className="flex items-center justify-center">
                                    <h4 className="font-bold text-md">{t('register.labels.preview')}</h4>
                                </div>

                                <div className="mt-2 ps-2 flex justify-center items-center">
                                    <div className="flex gap-2 items-center">
                                        {
                                            previewIcon !== '' &&
                                            <img className="w-6 h-6 img-shadow" src={previewIcon} alt="preview" />
                                        }
                                        <span>{watch('name')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                            <Button variant="contained" color="primary" onClick={() => onClose()}>
                                {tCore('messages.labels.app.return')}
                            </Button>
                            <Button type="submit" variant="contained" color="secondary" >
                                {
                                    isEdit ?
                                        t('descriptions.save-changes')
                                        :
                                        t('titles.new-category')
                                }
                            </Button>
                        </div>
                    </form>
                </div>

            </AppModal>
        </>
    );
};