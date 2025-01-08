import { IAbout } from '../interfaces/aboutInterface';
import { saveAboutRepo } from '../repos/aboutRepo';

const saveAboutService = async (aboutDetails: IAbout) => {
  try {
    const about = await saveAboutRepo(aboutDetails);
    return {
      success: 'true',
      data: about,
      message: 'About added successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to add about to the database',
    };
  }
};

export { saveAboutService };
