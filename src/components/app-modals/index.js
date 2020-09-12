import React from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions'
import LanguageSelectionModal from './language-selection-modal'


export default function AppModals(props) {

    const dispatch = useDispatch()

    const { isLanguageModalVisible } = useSelector((state) => state.appModalState)

    const onHideLanguageSelectionModal = () => {
        dispatch(toggleLanguageModal(false))
    }

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <LanguageSelectionModal visible={isLanguageModalVisible} onHideModal={onHideLanguageSelectionModal} />
        </View>
    )
}