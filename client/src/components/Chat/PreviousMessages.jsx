import React from 'react';

import PropTypes from 'prop-types';

import { AiFillCaretDown } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';

import BadWordsNext from 'bad-words-next';
import en from 'bad-words-next/data/en.json';

import decryptMessage from 'src/lib/decryptMessage';

const PreviousMessages = ({
	id,
	isSender,
	isEdited,
	openPreviousEdit,
	openPreviousMessages,
	oldMessages,
}) => {
	const badwords = new BadWordsNext({ data: en });
	return (
		<div>
			{isEdited && (
				<div
					className={`cursor-pointer flex items-center gap ${
						isSender ? 'flex-row' : 'flex-row-reverse'
					}`}
					onClick={() => openPreviousEdit(id)}
				>
					<BiSolidEditAlt className="fill-white scale-110" />
					<AiFillCaretDown className="fill-white scale-75" />
				</div>
			)}
			{isEdited && openPreviousMessages === id && (
				<div
					className={`absolute ${
						isSender ? 'right-10' : 'left-10'
					} top-12 bg-highlight px-4 py-2 gap flex flex-col rounded-md w-[100px] z-40`}
				>
					<p className="text-center font-bold underline text-lg">Old</p>
					<div className="flex flex-col">
						{oldMessages !== undefined &&
							Array.isArray(oldMessages) &&
							oldMessages.map((message, index) => {
								message = badwords.filter(decryptMessage(message));
								return (
									<span key={index} className="text-base">
										{message}
									</span>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
};

export default PreviousMessages;

PreviousMessages.propTypes = {
	id: PropTypes.string.isRequired,
	isSender: PropTypes.bool.isRequired,
	isEdited: PropTypes.bool,
	openPreviousEdit: PropTypes.func.isRequired,
	openPreviousMessages: PropTypes.string,
	oldMessages: PropTypes.array,
};
