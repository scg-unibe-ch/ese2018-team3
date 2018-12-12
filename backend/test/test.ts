import {JobModel, UserModel} from '../app/models';
import {sha256} from 'js-sha256';

export async function jobExamples() {
    const user1 = new UserModel();

    user1.fromSimplification({
        username: 'tom',
        password: sha256('tomtom'),
        email: 'tom@tom.com',
        company: 'Tomtastic Solutions',
        isApproved: false
    });

    const user2 = new UserModel();

    user2.fromSimplification({
        username: 'bob',
        password: sha256('bobbob'),
        email: 'bob@bob.com',
        company: 'Bobby B Technology Inc.',
        isApproved: true
    });


    await user1.save();
    await user2.save();


    const job1 = new JobModel();
    const job2 = new JobModel();
    const job3 = new JobModel();
    const job4 = new JobModel();
    const job5 = new JobModel();
    const job6 = new JobModel();

    job1.fromSimplification({
        userId: 3,
        company: user2.company,
        title: 'Junior Technical Support',
        createdAt: new Date(),
        start: new Date(),
        endDate: '2018-12-23 00:00:00.000 +00:00',
        description: 'We are looking for Junior Technical Support to fill a vacancy. The Tech Company is an internationally leading Fintech company. The Tech Company is the only independent provider for the IT industry to both develop and operate its own software.',
        occupation: '100%',
        qualifications: 'Bachelors Degree',
        remarks: 'It\'s possible to work at home',
        salary: '5400.-',
        contact: 'example@example.com',
        isApproved: true
    });

    job2.fromSimplification({
        userId: 3,
        company: user2.company,
        title: 'HR Assistant',
        createdAt: new Date(),
        endDate: '2018-12-23 00:00:00.000 +00:00',
        description: 'We are looking for HR Assistant to fill a vacancy. The Tech Company is an internationally leading Fintech company. The Tech Company is the only independent provider for the IT industry to both develop and operate its own software.',
        qualifications: 'Bachelors Degree',
        isApproved: true
    });

    job3.fromSimplification({
        userId: 3,
        company: user2.company,
        title: 'Senior Project Manager',
        createdAt: new Date(),
        endDate: '2018-12-23 00:00:00.000 +00:00',
        description: 'We are looking for Senior Project Manager to fill a vacancy. The Tech Company is an internationally leading Fintech company. The Tech Company is the only independent provider for the IT industry to both develop and operate its own software.',
        qualifications: 'Bachelors Degree',
        isApproved: true
    });

    job4.fromSimplification({
        userId: 3,
        company: user2.company,
        title: 'Software Developer',
        createdAt: new Date(),
        endDate: '2018-12-23 00:00:00.000 +00:00',
        description: 'We are looking for Software Developer to fill a vacancy. The Tech Company is an internationally leading Fintech company. The Tech Company is the only independent provider for the IT industry to both develop and operate its own software.',
        qualifications: 'Bachelors Degree',
        isApproved: true
    });

    job5.fromSimplification({
        userId: 3,
        company: user2.company,
        title: 'Internship Front-End Dev',
        createdAt: new Date(),
        endDate: '2018-12-23 00:00:00.000 +00:00',
        description: 'We are looking for Internship Front-End Dev to fill a vacancy. The Tech Company is an internationally leading Fintech company. The Tech Company is the only independent provider for the IT industry to both develop and operate its own software.',
        qualifications: 'Bachelors Degree',
        isApproved: true
    });

    job6.fromSimplification({
        userId: 3,
        company: user2.company,
        title: 'Support for software developers',
        createdAt: new Date(),
        endDate: '2018-12-23 00:00:00.000 +00:00',
        description: 'UniCom is a fast growing small company, which specializes in communication and supporting customers psychologically. We are currently recruiting several new supporters to help our customers be more productive by throwing in ideas, solving small disputes and keeping a warm atmosphere.',
        qualifications: 'Experience in programming is preferred (C/C++, C#, Java, Javascript, Perl, ...) - Being a very open, honest person willing to share ideas, wther they are helpful or not.',
        isApproved: false
    });

    await job1.save();
    await job2.save();
    await job3.save();
    await job4.save();
    await job5.save();
    await job6.save();
}
