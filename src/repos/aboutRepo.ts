import { IAbout } from '../interfaces/aboutInterface';
import About from '../models/aboutModel';

const saveAboutRepo = async (aboutDetails: IAbout) => {
  try {
    const about = new About(aboutDetails);
    await about.save();
    return about;
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to add about to the database',
    };
  }
};
const getAllAboutRepo = async () => {
  try {
    const about = await About.find();
    return about;
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to fetch about from the database',
    };
  }
};
const getLatestAboutRepo = async () => {
  try {
    const about = await About.findOne().sort({ updatedAt: -1 });
    return about;
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to fetch about from the database',
    };
  }
};
const updateAboutRepo = async (aboutDetails: IAbout, id: string) => {
  try {
    const about = await About.findByIdAndUpdate(id, aboutDetails, {
      new: true,
    });
    return about;
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to update about to the database',
    };
  }
};

export { saveAboutRepo, getAllAboutRepo, getLatestAboutRepo, updateAboutRepo };
