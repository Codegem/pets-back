interface CloudinaryClient {
    uploadImage: (imagePromise: Promise<any>) => Promise<string | undefined>;
    deleteImage: (imageUrl: string) => void;
}

const cloudinaryClient = (cloudinary: any): CloudinaryClient => ({
    uploadImage: async (
        imagePromise: Promise<any>
    ): Promise<string | undefined> => {
        const image = await imagePromise;
        return new Promise((resolve, reject) => {
            if (image) {
                const uploadStream = cloudinary.uploader.upload_stream(
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
        const [ publicId ] = parts[parts.length - 1].split('.');
        cloudinary.uploader.destroy(publicId);
    },
});

const cloudinary = require('cloudinary').v2;

export default () => cloudinaryClient(cloudinary);
