import { IimageSection } from '../interfaces/imageSectioninterFace';
import ImageSection from '../models/imageSectionModel';

const saveImageSectionRepo = async (imageSectionDetails: IimageSection) => {
  try {
    const imageSection = new ImageSection(imageSectionDetails);
    await imageSection.save();
    return imageSection;
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to add image section to the database',
    };
  }
};

export { saveImageSectionRepo };
