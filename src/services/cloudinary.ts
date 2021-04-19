interface CloudinaryClient {
    uploadImage: (imagePromise: Promise<any>) => Promise<string | undefined>;
    deleteImage: (imageUrl: string) => void;
<<<<<<< HEAD
=======
    isOk: () => Promise<boolean>;
>>>>>>> 9eeb537630311ff29454c13a9462fc3909dfc4c3
}

const cloudinaryClient = (cloudinary: any): CloudinaryClient => ({
    uploadImage: async (
        imagePromise: Promise<any>
    ): Promise<string | undefined> => {
        const image = await imagePromise;
        return new Promise((resolve, reject) => {
            if (image) {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
<<<<<<< HEAD
                        transformation: { width: 1200, height: 675, crop: "fill" }
=======
                        transformation: {
                            width: 1200,
                            height: 675,
                            crop: 'fill',
                        },
>>>>>>> 9eeb537630311ff29454c13a9462fc3909dfc4c3
                    },
                    (error: any, result: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );
                image.createReadStream().pipe(uploadStream);
            } else {
                resolve(undefined);
            }
        });
    },
    deleteImage: (imageUrl: string) => {
        const parts = imageUrl.split('/');
<<<<<<< HEAD
        const [ publicId ] = parts[parts.length - 1].split('.');
        cloudinary.uploader.destroy(publicId);
    },
});

const cloudinary = require('cloudinary').v2;

export default () => cloudinaryClient(cloudinary);
=======
        const [publicId] = parts[parts.length - 1].split('.');
        cloudinary.uploader.destroy(publicId);
    },
    isOk: async () => {
        const response = await cloudinary.api.ping();
        return response.status === 'ok';
    }
});

const { v2 } = require('cloudinary');

export default () => cloudinaryClient(v2);
>>>>>>> 9eeb537630311ff29454c13a9462fc3909dfc4c3
