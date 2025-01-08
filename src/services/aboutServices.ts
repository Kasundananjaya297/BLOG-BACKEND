import { IAbout } from '../interfaces/aboutInterface';
import {
  saveAboutRepo,
  getAllAboutRepo,
  getLatestAboutRepo,
  updateAboutRepo,
} from '../repos/aboutRepo';

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
const getAllAboutService = async () => {
  try {
    const about = await getAllAboutRepo();
    return {
      success: 'true',
      data: about,
      message: 'About fetched successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to fetch about from the database',
    };
  }
};
const getLatestAboutService = async () => {
  try {
    const about = await getLatestAboutRepo();
    return {
      success: 'true',
      data: about,
      message: 'About fetched successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to fetch about from the database',
    };
  }
};
const updateAboutService = async (aboutDetails: IAbout, id: string) => {
  try {
    const about = await updateAboutRepo(aboutDetails,id);
    return {
      success: 'true',
      data: about,
      message: 'About updated successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to update about in the database',
    };
  }
};

export {
  saveAboutService,
  getAllAboutService,
  getLatestAboutService,
  updateAboutService,
};
