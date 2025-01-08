import { IimageSection } from '../interfaces/imageSectioninterFace';
import { saveImageSectionRepo } from '../repos/imageSectionRepo';

const saveImageSectionService = async (imageSectionData: IimageSection) => {
    try {
        const imageSection = await saveImageSectionRepo(imageSectionData);
        return {
        success: 'true',
        data: imageSectionData,
        message: 'Image Section added successfully',
        };
    } catch (err) {
        console.log(err);
        return {
        success: 'false',
        data: [],
        message: 'Failed to add image section to the database',
        };
    }
};
export { saveImageSectionService };
