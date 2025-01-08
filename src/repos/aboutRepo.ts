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

export { saveAboutRepo };
